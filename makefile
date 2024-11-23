BACKEND_DIR = groundstation
FRONTEND_DIR = groundstation_ui

run_groundstation:
	source ${BACKEND_DIR}/myenv/bin/activate && python3 ${BACKEND_DIR}/app.py

# Run the frontend development server
run_groundstation_ui:
	cd ${FRONTEND_DIR} && npm run dev

clean:
	rm -rf $(VENV)
	rm -rf __pycache__
	rm -rf ${FRONTEND_DIR}/node_modules
	rm -f ${FRONTEND_DIR}/package-lock.json
	rm -rf ${BACKEND_DIR}/__pycache__
