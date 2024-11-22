REQUIREMENTS = backend/requirements.txt

run-backend:
	source backend/myenv/bin/activate && python3 backend/app.py

# Install frontend dependencies
install-frontend:
	cd gui && npm install

# Run the frontend development server
run-frontend:
	cd gui && npm run dev

clean:
	rm -rf $(VENV)
	rm -rf __pycache__
	rm -rf gui/node_modules
	rm -f gui/package-lock.json
	rm -rf backend/__pycache__
