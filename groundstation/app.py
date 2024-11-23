from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
import time
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
    return jsonify({"success": True, "ports": ports})

@app.route("/set_port", methods=["POST"])
def set_serial_port():
    """Set the serial port."""
    port = request.json.get("port")
    if not port:
        return jsonify({"success": False, "error": "No port specified"}), 400
    
    try:
        serialComm.set_serial_port(port)
        serialComm.open_serial_port()
        return jsonify({"success": True, "message": f"Serial port {port} set and opened."})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/stop_port", methods=["POST"])
def stop_serial_port():
    """Close the serial port."""
    try:
        serialComm.close_serial_port()
        return jsonify({"success": True, "message": "Serial port closed."})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@socketio.on("request_telemetry")
def stream_telemetry():
    """Stream telemetry data via WebSocket."""
    if serialComm.ser and serialComm.ser.is_open:
        try:
            for data in serialComm.read_serial_data():
                # Print the telemetry data to the console for debugging purposes
                print(f"Telemetry Data: {data}")
                
                # Emit each item in real-time to the WebSocket clients
                socketio.emit("telemetry_data", data)
                
                # Adjust the frequency of data reading as needed
                socketio.sleep(0.1)  # Use socketio.sleep instead of time.sleep to allow other operations
        except Exception as e:
            print(f"Error reading telemetry data: {str(e)}")
    else:
        emit("telemetry_data", {"error": "Serial port not available"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to port 5000
    socketio.run(app, debug=True, host="0.0.0.0", port=port)
