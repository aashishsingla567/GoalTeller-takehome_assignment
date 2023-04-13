import axios from 'axios';
import { MutualFund, MutualFundDetails } from '../types';

const BASE_URL = 'https://api.mfapi.in/mf';

/**
 * Gets the list of all Fund available (without pagiation)
 */
export const getMutualFundsList = async (): Promise<MutualFund[] | null> => {
    try {
        // debugger;
        const response = await axios.get(`${BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Searches for Mutual funds matching the given query
 */
export const searchMutualFunds = async (query: string): Promise<MutualFund[] | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Gets the details of the requested fund
 */
export const getFundDetails = async (schemeCode: number): Promise<MutualFundDetails | null> => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${schemeCode}`);

        if (data.status !== "SUCCESS") {
            throw Error("Error fetching the fund details");
        }

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
