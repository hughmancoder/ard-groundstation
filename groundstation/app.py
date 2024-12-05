import socket
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from SerialComm import SerialComm  

app = Flask(__name__)
CORS(app)  
socketio = SocketIO(app, cors_allowed_origins="*")  
serialComm = SerialComm()

@app.route("/ports", methods=["GET"])
def list_serial_ports():
    """List available serial ports."""
    ports = SerialComm.list_serial_ports()
    print(f"Available ports: {ports}")
    return jsonify({"success": True, "ports": ports})


@app.route("/stop_port", methods=["POST"])
def stop_serial_port():
    """Close the serial port."""
    try:
        serialComm.close_serial_port()
        return jsonify({"success": True, "message": "Serial port closed."})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/set_port", methods=["POST"])
def set_serial_port():
    """Set the serial port."""
    port = request.json.get("port")
    if not port:
        return jsonify({"success": False, "error": "No port specified"}), 400

    try:
        serialComm.set_serial_port(port)
        print(f"Serial port {port} has been set")
        return jsonify({"success": True, "message": f"Serial port {port} has been set"})
    except Exception as e:
        print(f"ERROR: Failed to set serial port: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/open_port", methods=["POST"])
def open_serial_port():
    """Open the serial port."""
    try:
        serialComm.open_serial_port()
        print(f"Serial port {serialComm.port_name} successfully opened")
        
        socketio.emit("port_opened", {"port": serialComm.port_name})
        
        return jsonify({"success": True, "message": f"Serial port {serialComm.port_name} successfully opened"})
    except Exception as e:
        print(f"ERROR: Failed to open serial port: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@socketio.on("request_telemetry")
def stream_telemetry():
    print("Received request for telemetry data")
    if serialComm.ser and serialComm.ser.is_open:
        socketio.start_background_task(target=stream_telemetry_background) # new thread
    else:
        print("Serial port not available")
        emit("telemetry_data", {"error": "Serial port not available"})

def stream_telemetry_background():
    print("Starting telemetry stream in background")
    try:
        for data in serialComm.read_serial_data_from_binary_stream(): # serialComm.read_serial_data_from_csv()
            # Use broadcast=True if you want to send to all connected clients
            socketio.emit("telemetry_data", data)
            socketio.sleep(0.1)  
    except Exception as e:
        print(f"Error reading telemetry data: {str(e)}")
        socketio.emit("telemetry_data", {"error": str(e)})

if __name__ == "__main__":
    host="127.0.0.1" # "192.168.1.209"  
    port = 5000
    print(f"Starting server on host {host} and port {port}")
    socketio.run(app, debug=True, host=host, port=port)