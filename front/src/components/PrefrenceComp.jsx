import 'bootstrap/dist/css/bootstrap.css';
import '../styles/PrefrenceComp.css'
import { useState , useEffect} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
function PrefrenceComp() {

const rangeValueRecord = {
    1 : "Very Rarely",
    2 : "Rarely",
    3 : "Sometimes",
    4 : "Often",
    5 : "Very often"
}
const [create, IsCreate] = useState(true)
const [loading, IsLoading] = useState(false)
const [cat1val,Setcat1val] = useState("3")
const [cat2val,Setcat2val] = useState("3")
const [cat3val,Setcat3val] = useState("3")
const [cat4val,Setcat4val] = useState("3")
const nav = useNavigate()
useEffect(()=>{
    const getPrefs = async ()=>{
        IsLoading(true)
        try {
            const getResp = await api.get("api/prefrence/retrive/")
            console.log(getResp)
            if (getResp.data.length !== 0){
                IsCreate(false)
            }
        } catch (error) {
            alert(error)
        } finally{
            IsLoading(false)
        }
    }
    getPrefs()
},[])
const sendPrefs = async(e) => {
    e.preventDefault()
    IsLoading(true)
    try {
        const fluffy_val = parseInt(cat1val)
        const majestic_val = parseInt(cat2val)
        const funny_val = parseInt(cat3val)
        const outfit_val = parseInt(cat4val)
        if(create){
            const createResp = await api.post("api/prefrence/create/",{fluffy_val,majestic_val,funny_val,outfit_val})
            console.log(createResp)
        }
        else{
            const updateResp = await api.put("api/prefrence/update/",{fluffy_val,majestic_val,funny_val,outfit_val})
            console.log(updateResp)
        }
        nav("/")
    } catch (error) {
        alert(error)
    } finally{
        IsLoading(false)
    }
}
document.title = "Prefrences"
return(
<form onSubmit={sendPrefs} className='form-container'>
    <div className='m-0'>
        <label htmlFor="catCategory1" className='form-label h3'>How often would you like to see fluffy cats?</label>
        <p className='valuep'>{rangeValueRecord[cat1val]}</p>
        <input value={cat1val} type="range" className="form-range" min="1" max="5" step={1} id="catCategory1Range" onChange={(e) => Setcat1val(e.target.value)}/>    
    </div>
    <div className='m-0'>
        <label htmlFor="catCategory2" className='form-label h3'>How often would you like to see majestic cats?</label>
        <p className='valuep'>{rangeValueRecord[cat2val]}</p>
        <input value={cat2val} type="range" className="form-range" min="1" max="5" step={1} id="catCategory1Range" onChange={(e) => Setcat2val(e.target.value)}/>    
    </div>
    <div className='m-0'>
        <label htmlFor="catCategory3" className='form-label h3'>How often would you like to see funny cats?</label>
        <p className='valuep'>{rangeValueRecord[cat3val]}</p>
        <input value={cat3val} type="range" className="form-range" min="1" max="5" step={1} id="catCategory1Range" onChange={(e) => Setcat3val(e.target.value)}/>    
    </div>
    <div className='m-0'>
        <label htmlFor="catCategory4" className='form-label h3'>How often would you like to see cats in outfits?</label>
        <p className='valuep'>{rangeValueRecord[cat4val]}</p>
        <input value={cat4val} type="range" className="form-range" min="1" max="5" step={1} id="catCategory1Range" onChange={(e) => Setcat4val(e.target.value)}/>    
    </div>
    {loading}
    <div className='row justify-content-center'>
    <div className='col-auto'>
        <button type='submit' className='btn btn-primary btn-lg'>Submit</button>
    </div>
    </div>
</form>
)
}
export default PrefrenceComp