const PageSwitch = () => {
  return (
    <>
      {/* <div className="fixed bottom-20 left-10 flex justify-between pt-4">
            <div className="flex items-center w-80 text-gray-800">
              <button
                onClick={() => setView("telemetry")}
                className={`relative px-8 text-sm font-bold uppercase rounded ${
                  view === "telemetry"
                    ? "bg-white text-gray z-10 py-6"
                    : "bg-gray-900 bg-opacity-[0.1] text-white border py-4"
                }`}
              >
                Telemetry
              </button>
              <button
                onClick={() => setView("settings")}
                className={`relative -translate-x-1 px-8 border rounded text-sm font-bold uppercase ${
                  view === "settings"
                    ? "bg-white text-gray z-10 py-6"
                    : "bg-gray-900 bg-opacity-[0.1] text-white py-4"
                }`}
              >
                Settings
              </button>
            </div>
          </div>  */}
    </>
  );
};

export default PageSwitch;