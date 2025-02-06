BACKEND_DIR = backend
FRONTEND_DIR = gui

all: 
	run_groundstation
	run_groundstation_ui

run_groundstation:
	source ${BACKEND_DIR}/myenv/bin/activate && python3 ${BACKEND_DIR}/app.py --no-debug

make run_groundstation_debug:
	source ${BACKEND_DIR}/myenv/bin/activate && python3 ${BACKEND_DIR}/app.py --debug

# Run the frontend development server
run_gui:
	cd ${FRONTEND_DIR} && npm run dev

# works on mac
run:
	osascript -e 'tell application "Terminal" to do script "cd $(PWD) && make run_groundstation"' & \
	osascript -e 'tell application "Terminal" to do script "cd $(PWD) && make run_groundstation_ui"'
	
clean:
	rm -rf $(VENV)
	rm -rf __pycache__
	rm -rf ${FRONTEND_DIR}/node_modules
	rm -f ${FRONTEND_DIR}/package-lock.json
	rm -rf ${BACKEND_DIR}/__pycache__
