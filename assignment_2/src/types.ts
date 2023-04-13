/**
 * MutualFund example:
 * {"schemeCode":100717,"schemeName":"SBI MAGNUM DEBT FUND SERIES - 60 DAYS - 2 - DIVIDEND"}
 */
export interface MutualFund {
    schemeCode: number;
    schemeName: string;
}


/**
 * MutualFundDetails example:
 * {
 *      "meta": {
 *          "fund_house": "SBI Mutual Fund",
 *          "scheme_type": "Close Ended Schemes",
 *          "scheme_category": "Income",
 *          "scheme_code": 100717,
 *          "scheme_name": "SBI MAGNUM DEBT FUND SERIES - 60 DAYS - 2 - DIVIDEND"
 *      },
 *      "data": [
 *          {
 *              "date": "05-07-2006",
 *              "nav": "0.00000"
 *          },
 *          {
 *              "date": "28-06-2006",
 *              "nav": "0.00000"
 *          },
 *          {
 *              "date": "21-06-2006",
 *              "nav": "0.00000"
 *          },
 *          {
 *              "date": "14-06-2006",
 *              "nav": "0.00000"
 *          }
 *      ],
 *      "status": "SUCCESS"
 *  }
 */
export interface MutualFundDetails {
    meta: {
        fund_house: string;
        scheme_type: string;
        scheme_category: string;
        scheme_code: number;
        scheme_name: string;
    };
    data: {
        date: string;
        nav: string;
    }[];
    status: "SUCCESS" | "FAILURE";
}

export interface Portfolio {
    funds: MutualFund[];
    units: number[];
}

export interface SearchFilter {
    name?: string | undefined;
    type?: string | undefined;
    rating?: number | null | undefined;
    returns?: number | null | undefined;
}

export interface SearchParams {
    query: string;
    filters: SearchFilter;
}