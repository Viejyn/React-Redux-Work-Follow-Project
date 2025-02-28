import React, { useRef } from "react";
import { sortOption, statusOption, typeOption } from "../helpers/constants";
import { useDispatch } from "react-redux";
import { clearFilters, filterBySearch, filterByStatus, filterByType, sortJobs } from "../redux/jobSlice";

const Filter = () => {
    const dispatch = useDispatch();

    const inputRef = useRef();
    const typeRef = useRef();
    const statusRef = useRef();
    const sortRef = useRef();

    const handleReset = () => { 
        dispatch(clearFilters());
        inputRef.current.value='';
        typeRef.current.value='Seçiniz';
        statusRef.current.value='Seçiniz';
        sortRef.current.value='Seçiniz';
    };

    return (
        <div className="filter-sec">
            <h2>Filtre Formu</h2>
            <form>
                <div>
                    <label htmlFor="">Arama</label>
                    <input ref={inputRef}
                    onChange={(e) => dispatch(filterBySearch(e.target.value))} 
                    type="text" placeholder="örn: Amazon"
                    />
                </div>
                <div>
                    <label htmlFor="">Durum</label>
                    <select ref={statusRef} name="status" defaultValue="Seçiniz" 
                      onChange={(e) => dispatch(filterByStatus(e.target.value))}>
                        <option disabled>Seçiniz</option>
                        {statusOption.map((statu) => (
                            <option key={statu}>{statu}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Tür</label>
                    <select ref={typeRef} name="type" defaultValue="Seçiniz" 
                      onChange={(e) => dispatch(filterByType(e.target.value))}>
                        <option disabled>Seçiniz</option>
                        {typeOption.map((type) => (
                            <option key={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Sırala</label>
                    <select ref={sortRef} name="sort" defaultValue="Seçiniz"  
                      onChange={(e) => dispatch(sortJobs(e.target.value))}>
                        <option disabled>Seçiniz</option>
                        {sortOption.map((sort) => (
                            <option key={sort}>{sort}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <button type="button" onClick={handleReset}>Filtreleri Temizle</button>
                </div>
            </form>
        </div>
    )
}

export default Filter;