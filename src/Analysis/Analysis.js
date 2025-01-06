import React, { useState, useEffect } from "react";
import "./Analysis.css";

function Analysis() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when the component is mounted
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch("http://13.61.9.207:7000/url/analytics");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return ( <
        div className = "analysis-container" >
        <
        h2 > URL Analysis < /h2>

        {
            loading ? ( <
                p > Loading data... < /p>
            ) : error ? ( <
                p className = "error-message" > { error } < /p>
            ) : ( <
                table className = "analysis-table" >
                <
                thead >
                <
                tr >
                <
                th > Short URL < /th> <
                th > Long URL < /th> <
                th > Click Count < /th> < /
                tr > <
                /thead> <
                tbody > {
                    data.length > 0 ? (
                        data.map((item, index) => ( <
                            tr key = { index } >
                            <
                            td > { item.shortUrl } < /td> <
                            td > { item.longUrl } < /td> <
                            td > { item.clickCount } < /td> < /
                            tr >
                        ))
                    ) : ( <
                        tr >
                        <
                        td colSpan = "3" > No data available < /td> < /
                        tr >
                    )
                } <
                /tbody> < /
                table >
            )
        } <
        /div>
    );
}

export default Analysis;