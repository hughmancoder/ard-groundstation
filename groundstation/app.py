import socket
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from SerialComm import SerialComm  # Import your SerialComm class

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable WebSocket support

# Initialize the SerialComm instance
serialComm = SerialComm()

@app.route("/ports", methods=["GET"])
def list_serial_ports():
    """List available serial ports."""
    ports = SerialComm.list_serial_ports()
    print(f"DEBUG: Available ports: {ports}")
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
        print(f"DEBUG: Setting serial port to {port}")
        serialComm.set_serial_port(port)
        serialComm.open_serial_port()  # Ensure this is the correct method to open the port
        print(f"DEBUG: Serial port {port} successfully opened.")
        return jsonify({"success": True, "message": f"Serial port {port} set and opened."})
    except Exception as e:
        print(f"ERROR: Failed to set serial port: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@socketio.on("request_telemetry")
def stream_telemetry():
    """Stream telemetry data via WebSocket."""
    if serialComm.ser and serialComm.ser.is_open:
        try:
            print("Streaming telemetry data...")
            for data in serialComm.read_serial_data():

                print(f"Telemetry Data: {data}")
                
                socketio.emit("telemetry_data", data)
                
                socketio.sleep(0.1) 
        except Exception as e:
            print(f"Error reading telemetry data: {str(e)}")
    else:
        print("Serial connection not available.")
        emit("telemetry_data", {"error": "Serial port not available"})

if __name__ == "__main__":
    host="127.0.0.1" # "192.168.1.209"  
    port = 5000
    print(f"Starting server on host {host} and port {port}")
    socketio.run(app, debug=True, host=host, port=port)