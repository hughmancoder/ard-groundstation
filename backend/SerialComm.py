import glob
import sys
import time
import serial
import struct
import csv

DATA_COLUMNS = [
    'time', 'bmpTemp', 'imuTemp', 'pressure', 'altitude',
    'accX', 'accY', 'accZ', 'angVelX', 'angVelY', 'angVelZ'
]

class SerialComm:
    def __init__(self, port_name=None, baudrate=9600, timeout=1, simulation_mode=False):
        self.port_name = port_name
        self.baudrate = baudrate
        self.timeout = timeout
        self.simulation_mode = simulation_mode
        self.ser = None
        self.stop_threads = False
        self.PACKET_FORMAT = '<Iffffffffff'  # TelemetryPacket object
        self.PACKET_SIZE = struct.calcsize(self.PACKET_FORMAT)
        self.serial_data_buffer = []
        self.CSV_FILE_NAME = "save.csv"

    def open_serial_port(self):
        self.stop_threads = False  # Reset stop flag when opening
        if self.port_name:
            try:
                self.ser = serial.Serial(
                    self.port_name,
                    self.baudrate,
                    timeout=0  # Non-blocking mode
                )
                print(f"Opened serial port: {self.port_name}")
            except serial.SerialException as e:
                print(f"Error opening serial port: {e}")
                self.ser = None
        else:
            print("No serial port set.")

    def close_serial_port(self):
        self.stop_threads = True
        if self.ser and self.ser.is_open:
            self.ser.close()
            print(f"Closed serial port: {self.port_name}")

    def read_serial_data_from_binary_stream(self):
        while not self.stop_threads:
            if self.ser and self.ser.is_open:
                try:
                    raw_data = self.ser.read(self.PACKET_SIZE)
                    if len(raw_data) == self.PACKET_SIZE:
                        data = struct.unpack(self.PACKET_FORMAT, raw_data)
                        print("Binary stream data:", data)
                        yield dict((DATA_COLUMNS[i], data[i]) for i in range(len(DATA_COLUMNS)))
                    else:
                        time.sleep(0.01)
                except serial.SerialException as e:
                    print(f"Error reading from serial port into binary stream: {e}")
                    self.stop_threads = True
                    break

    def read_serial_data_from_csv(self):
        while not self.stop_threads:
            if self.ser and self.ser.is_open:
                try:
                    line = self.ser.readline().decode('utf-8').strip()
                    entries = line.split(',') 
                    if len(entries) >= len(DATA_COLUMNS):
                        print(dict((DATA_COLUMNS[i], entries[i]) for i in range(len(DATA_COLUMNS))))
                        yield dict((DATA_COLUMNS[i], float(entries[i])) for i in range(len(DATA_COLUMNS)))
                    else:
                        time.sleep(0.01)
                except serial.SerialException as e:
                    print(f"Error reading from serial port into binary stream: {e}")
                    self.stop_threads = True
                    break


    def set_baud_rate(self, baudrate):
        self.baudrate = baudrate

    def set_serial_port(self, port_name):
        """Set the serial port."""
        self.port_name = port_name

    def list_serial_ports(self):
        print("Listing available serial ports for platform ", sys.platform)
        """List available serial ports."""
        if sys.platform.startswith('win'):
            ports = ['COM%s' % (i + 1) for i in range(256)]
        elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
            ports = glob.glob('/dev/tty[A-Za-z]*')
        elif sys.platform.startswith('darwin'):
            ports = glob.glob('/dev/tty.*')
            # ports = glob.glob('/dev/tty.*') + glob.glob('/dev/cu.*') ## tty: incoming data, cu: outgoing data
        else:
            raise EnvironmentError('Unsupported platform')

        result = []
        for port in ports:
            try:
                s = serial.Serial(port)
                s.close()
                result.append(port)
            except (OSError, serial.SerialException):
                pass
        return result
    
    

    def write_to_csv_file(data_dict, columns):
        """
        Writes a dictionary of data to a CSV file.
        If the file doesn't exist, it creates it and writes the header.
        
        :param data_dict: Dictionary containing the data to write (one row).
        :param columns: List of column names for the CSV file.
        """
        try:
            # Open the file in append mode ('a') and create if it doesn't exist ('newline' prevents extra blank lines)
            with open(self.CSV_FILE_NAME, mode='a', newline='') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=columns)
                
                # If the file is empty, write the header
                if csvfile.tell() == 0:
                    writer.writeheader()
                
                # Write the data row
                writer.writerow(data_dict)
        except Exception as e:
            print(f"Error writing to CSV file: {e}")