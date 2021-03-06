import { useEffect, useState } from "react";

import { API } from "../config/api";

// import css 
import "../assets/css/search.css"

// import Component
import Header from "../components/Header"
import Pdf from "../components/Pdf";
import NoData from "../components/NoData";

// import image
import searchIcon from "../assets/images/search-icon.png";
import Literature from "../assets/images/search-literature.png";

export default function UserHome() {
    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [resultSearch, setResultSearch] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        getYears();
    }, []);

    const getYears = () => {
        const year = new Date().getFullYear();
        const allYear = Array.from(
        new Array(10),
        (val, index) => year - index
        ).sort((a, b) => b - a);
        setYears(allYear);
        setSelectedYear(allYear[allYear.length - 1]);
    };

    const handleChangeYears = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
        const response = await API.get(`literature?title=${search}`);

        setResultSearch(response.data.data);
        setIsSearch(true);
        } catch (error) {
        console.log(error);
        }
    };

    console.log(selectedYear)

  return (
    <div className="user-home">
        {/* header  */}
        <Header />
        {isSearch ? (
            <main className="py-4">
            <div className="container">
                <div className="research mb-5" style={{ width: 600 }}>
                <form className="d-flex" onSubmit={handleSearch}>
                    <input
                    className="form-control me-2 w-100"
                    type="search"
                    placeholder="Search for literature"
                    aria-label="Search"
                    onChange={handleChange}
                    value={search}
                    />
                    <button className="btn btn-danger" type="submit">
                        <img src={searchIcon} alt="Logo Literature" className="search-icon" />   
                    </button>
                </form>
                </div>
                <div className="result-search">
                <div className="row">
                    <div className="col-2">
                        <div className="text-danger ms-3 mb-2">Anytime</div>
                        <select
                            className="form-select"
                            name="year"
                            id="year"
                            value={selectedYear}
                            onChange={handleChangeYears}
                        >
                            {years.map((item, index) => (
                            <option value={item} key={`year-${index}`}>
                                Since {item}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                    <div className="row g-3">
                        {resultSearch.length ? (
                        resultSearch
                            .filter(
                                (item) =>
                                item?.status === "Approve" &&
                                item?.publication_date.split("-")[0] >= selectedYear
                            )
                            .map((item, index) => (
                                <div className="col-3" key={`result-search-${index}`}>
                                    <Pdf
                                    attache={item?.attache}
                                    literatureId={item?.id}
                                    title={item?.title}
                                    author={item?.author}
                                    publication_date={item?.publication_date}
                                    />
                                </div>
                            ))
                        ) : (
                        <div className="col">
                            <NoData />
                        </div>
                        )}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </main>
        ) : (
            <div className="container">
            <div className="searchHome">
                <img src={Literature} alt="Literature Logo" />
                <div className="mt-5" style={{ width: 600 }}>
                <form className="d-flex" onSubmit={handleSearch}>
                    <input
                    className="form-control me-2 w-100"
                    type="search"
                    placeholder="Search for literature"
                    aria-label="Search"
                    onChange={handleChange}
                    value={search}
                    />
                    <button className="btn btn-danger" type="submit">
                        <img src={searchIcon} alt="Logo Literature" className="search-icon" />   
                    </button>
                </form>
                </div>
            </div>
            </div>
        )}
    </div>
  );
}
