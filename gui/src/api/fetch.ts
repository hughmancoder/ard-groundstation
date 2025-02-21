/* 
// NOTE: deprecated
import { BASE_URL } from "../types";

export const fetchEndpoint = async (endpoint: string, options = {}) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; 
    }
  };

 */