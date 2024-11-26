import glob
import sys
import time
import serial
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

    def read_serial_data(self):
        while not self.stop_threads:
            if self.ser and self.ser.is_open:
                try:
                    raw_data = self.ser.read(self.PACKET_SIZE)
                    if len(raw_data) == self.PACKET_SIZE:
                        data = struct.unpack(self.PACKET_FORMAT, raw_data)
                        yield {
                            DATA_COLUMNS[i]: data[i] for i in range(len(DATA_COLUMNS))
                        }
                    else:
                        time.sleep(0.01)
                except serial.SerialException as e:
                    print(f"Error reading from serial port: {e}")
                    self.stop_threads = True
                    break
            else:
                time.sleep(0.1)

    def set_baud_rate(self, baudrate):
        self.baudrate = baudrate

    def set_serial_port(self, port_name):
        """Set the serial port."""
        self.port_name = port_name

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
    
    