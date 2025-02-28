import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainJobs:[],
    jobs:[],
    initialized:false,
    isError:false,
    errorMessage: ""
};

const jobSlice = createSlice({
    name:'jobs',
    initialState,
    reducers:{
        setJobs: (state,action) => {
            console.log("Redux Güncelleniyor:", action.payload);
            state.jobs = action.payload;
            state.mainJobs = action.payload;
            state.initialized = true;
            state.isError = false;
        },
        setError: (state, action) => {
            state.initialized = true;
            state.isError = true;
            state.errorMessage = action.payload;
        },
        addJob: (state,action) => {
            state.jobs.push(action.payload);
        },
        filterBySearch: (state, action) => {
            const query = action.payload.toLowerCase();
            state.jobs = state.mainJobs.filter((job) =>
                job.company.toLowerCase().includes(query)
            );     
        }, 
        filterByStatus: (state, action) => {
            state.jobs = state.mainJobs.filter((job) => job.status === action.payload);
        },
        filterByType: (state, action) => {
            state.jobs = state.mainJobs.filter((job) => job.type === action.payload);
        },
        sortJobs: (state, action) => {
            switch(action.payload) {
                case 'a-z':
                    state.jobs.sort((a, b) => a.company.localeCompare(b.company));
                    break;
                case 'z-a':
                    state.jobs.sort((a, b) => b.company.localeCompare(a.company));
                    break;   
                case 'En Yeni':
                    state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date)); 
                    break;
                case 'En Eski':
                    state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break; 
                default:
                    break;   
            }
        },
        clearFilters: (state) => {
            state.jobs = state.mainJobs;
        }   
    }
});

export const { setJobs, setError, addJob, filterBySearch, filterByStatus, filterByType, sortJobs, clearFilters } = jobSlice.actions;

export default jobSlice.reducer;