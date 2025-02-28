import React, { useEffect} from "react";
import Card from "../components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setError } from "../redux/jobSlice";
import 'react-toastify/dist/ReactToastify.css';
import Filter from "../components/Filter";

const JobList = () => {
    const jobs = useSelector((state) => state.jobs.jobs);
    const mainJobs = useSelector((state) => state.jobs.mainJobs);
    const initialized = useSelector((state) => state.jobs.initialized);
    const isError = useSelector((state) => state.jobs.isError); 
    const errorMessage = useSelector((state) => state.jobs.errorMessage);  
 
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:3050/jobs')
          .then((res) => {
            console.log("API Yanıtı:", res.data);
            dispatch(setJobs(res.data));
          }) 
          .catch((error) => {
            console.error("API Hatası:", error);
            dispatch(setError(error?.message || "Bilinmeyen hata"));
          }); 
        }, [dispatch]);

    return (
        <div className="list-page">
            <Filter />
            <h3 className="job-count">
                Bulunan ( {mainJobs?.length || 0} ) iş arasından ( {jobs?.length || 0} ) tanesini görüntülüyorsunuz.
            </h3>
            <section className="job-list">
                {/* Eğer API'den cevap bekleniyorsa */}
                {!initialized && <p>Yükleniyor...</p>}

                {/* Hata varsa mesajı göster */}
                { isError ? (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        Üzgünüz, bir hata oluştu: {errorMessage}
                    </p>  
                ) : (
                    jobs && jobs.length > 0 ? (
                        jobs.map((job) => <Card key={job.id} job={job} />)
                    ) : (
                        <p>Henüz kayıtlı bir iş bulunmuyor.</p>
                    )
                )}              
            </section>
        </div>
    );
};

export default JobList;