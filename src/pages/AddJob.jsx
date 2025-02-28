import React from "react";
import { v4 } from "uuid";
import { statusOption, typeOption } from "../helpers/constants";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/jobSlice";

const AddJob = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        e.preventDefault()

        // Form Datasını Oluşturma
        const form = new FormData(e.target)
        // Formdaki Değerlerden Bir Obje Oluşturma
        const newJob = Object.fromEntries(form.entries())

        if(!newJob.type || !newJob.status){
            toast.info('Tüm alanları doldurunuz.')
            
            return
        }
        // id ekleme
        newJob.id = v4();

        //tarih ekleme
        newJob.date = new Date().toLocaleDateString();

        axios.post('http://localhost:3050/jobs',newJob).then(() => {

            // Yeni İşi Store'a Kaydetme
            dispatch(addJob(newJob))

            // Ana Sayfaya Yönlendir
            navigate('/')

            // Ekleme Başarılı Bildirimi
            toast.success('İş Başarıyla Eklendi.');
        }
        ).catch((error) => toast.error('Beklenmedik bir hata oluştu...'));
    };

    return (
        <div className="add-sec">
            <h2>Yeni İş Ekle</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Pozisyon</label>
                    <input type="text" required name='position' />
                </div>
                <div>
                    <label htmlFor="">Şirket</label>
                    <input type="text" required name='company' />
                </div>
                <div>
                    <label htmlFor="">Lokasyon</label>
                    <input type="text" required name='location' />
                </div>
                <div>
                    <label htmlFor="">Durum</label>
                    <select name='status' defaultValue="">
                        <option value="" disabled>Seçiniz</option>
                        {statusOption.map((status,i) => (
                            <option key={i} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Tür</label>
                    <select name='type' defaultValue="">
                        <option value="" disabled>Seçiniz</option>
                        {typeOption.map((type,i) => (
                            <option key={i} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <button>Ekle</button>
                </div>
            </form>         
        </div>
    )
}

export default AddJob;