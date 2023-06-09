import {useEffect} from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { add } from '../features/cartSlice'
import {getProduct} from '../features/productSlice'
import Navbar from './Navbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Details(){
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const productdetail = useSelector((state)=> state.myproduct.products)
    console.log("productdetail",productdetail)
    
    useEffect(()=>{
        dispatch(getProduct(params.id))
    },[dispatch,params.id])

    const {title,image,description,price,category}= productdetail[params.id-1];
    // console.log(productdetail)


    const handleAdd = (product) => {
        dispatch(add(product));
        console.log("working")
    toast.success("Added to Cart !", {
        position: toast.POSITION.TOP_CENTER
      });
    };
    
    console.log(params.id)

    return(
        <>
        <Navbar/>
        <div className='container' id="details">
           <ToastContainer />
              <div id="detailsimg">
                 <img src={image} alt={title}/>
              </div>
              <div id="detailsspecs">
                 <h1 style={{color:"#009cff"}}>{title}</h1>
                 <h5> Description: {description}</h5>
                 <h4 style={{color:"rebeccapurple"}}>  Category: {category} </h4> 
                <h3 style={{color:"#181716"}}>  Price: {price} $</h3> 
                 
                 <button 
                     className='btn btn-warning'
                     onClick={() => handleAdd(productdetail[params.id-1]) }
                     > Add to cart </button>
                    <br/>
                    <button
                        className='btn btn-secondary'
                        onClick={() => navigate('/cart', {
                            state: {
                                title: productdetail.title,
                                price: productdetail.price,
                                image: productdetail.image
                            }
                        })}
                    >  go to cart </button>
              </div>
         </div>
         
        </>
    )
}

export default Details;