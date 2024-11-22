import pandas as pd
import time
import threading
import sys
import serial  
import glob  
import struct
from constants import DATA_COLUMNS

class SerialComm:
    def __init__(self, port_name=None, baudrate=9600, timeout=1, simulation_mode=False):
        self.port_name = port_name
        self.baudrate = baudrate
        self.timeout = timeout
        self.simulation_mode = simulation_mode
        self.ser = None
        self.stop_threads = False
        self.PACKET_FORMAT = '<Iffffffffff'  
        self.PACKET_SIZE = struct.calcsize(self.PACKET_FORMAT)
        self.serial_data_buffer = []

    def set_serial_port(self, port_name):
        """Set the serial port."""
        self.port_name = port_name

    def open_serial_port(self):
        """Open the serial port for communication."""
        if self.port_name:
            try:
                
                self.ser = serial.Serial(self.port_name, self.baudrate, timeout=self.timeout)
                print(f"Opened serial port: {self.port_name}")
            except serial.SerialException as e:
                print(f"Error opening serial port: {e}")
                self.ser = None
        else:
            print("No serial port set.")

    def close_serial_port(self):
        """Close the serial port."""
        self.stop_threads = True
        if self.ser and self.ser.is_open:
            self.ser.close()
            print(f"Closed serial port: {self.port_name}")

    def simulate_serial_output(self, path_to_csv='data.csv'):
        """Simulate serial data transfer from CSV."""
        df = pd.read_csv(path_to_csv)
        for index, row in df.iterrows():
            if self.stop_threads:
                break            
            
            self.serial_data_buffer.append(row.to_dict())
            time.sleep(0.1)  

    def read_serial_data(self):
        """Read binary data from the serial port."""
        while not self.stop_threads:
            if self.ser and self.ser.is_open:
                try:
                    raw_data = self.ser.read(self.PACKET_SIZE)
                    if len(raw_data) == self.PACKET_SIZE:
                        # Unpack the binary data into a structured format
                        data = struct.unpack(self.PACKET_FORMAT, raw_data)
                        yield {
                            DATA_COLUMNS[i]: data[i] for i in range(len(DATA_COLUMNS))
                        }
                except serial.SerialException as e:
                    print(f"Error reading from serial port: {e}")
                    self.stop_threads = True
                    break


    def start_simulation(self, csv_path):
        """Start a thread for simulating serial data from a CSV file."""
        self.stop_threads = False
        simulation_thread = threading.Thread(target=self.simulate_serial_output, args=(csv_path,))
        simulation_thread.start()

    def stop_simulation(self):
        """Stop the simulation and clean up."""
        self.stop_threads = True

    @staticmethod
    def list_serial_ports():
        """List available serial ports."""
        if sys.platform.startswith('win'):
            ports = ['COM%s' % (i + 1) for i in range(256)]
        elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
            ports = glob.glob('/dev/tty[A-Za-z]*')
        elif sys.platform.startswith('darwin'):
            ports = glob.glob('/dev/tty.*')
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
    
    