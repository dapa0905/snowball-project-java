import React, { useState, useEffect } from "react";

function MainMarketDataComponets(){
    const [marketData, setMarketData] = useState([]);

    useEffect(()=>{
        async function fetchMarketData() {
            try {
                const response = await fetch("http://localhost:8080/api/stocks/candles");
            } catch (error) {
                
            }
        }
    })

}