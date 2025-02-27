import {Sidebar} from "./Sidebar"
import { useEffect,useState,useContext } from "react"
import SpotifyWebApi from "spotify-web-api-js";
import { HomeNavbar } from "./HomeNavbar";
import styles from "./CSS/Homepage.module.css"
import {AutheContext}  from './Contextprovider'

import { Popular,span} from "./Artist/Artist";
import {HomeBoxes} from './homepagebox'
import {Link} from 'react-router-dom'
const spotifyApi = new SpotifyWebApi();


export const Homepage = () => {

  
  const [throwback,setThroback]= useState([])
  const [salena,setSalena]= useState([])

  const {state} = useContext(AutheContext)
  
  
    useEffect(()=>{
      spotifyApi.setAccessToken(state)
    

    spotifyApi.searchPlaylists('throwback')
    .then(function(data) {
      console.log('Found playlists are', data);
      setThroback(data?.playlists?.items)
    }, function(err) {
      console.log('Something went wrong!', err);
    });

    spotifyApi.searchPlaylists('salena gomez',{
      limit : 5
    })
    .then(function(data) {
      console.log('Found playlists party are', data,'sal');
      setSalena(data?.playlists?.items)
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  
  },[])
    return (
        <div>
            <Sidebar/>
            <HomeNavbar/>
            <div className={styles.homeDiv}>
        
            <Popular>
                <h2>Throwback</h2>
                <span>SEE ALL</span>
                <div>
                { (throwback.slice(0,4)).map((e)=>{
                    return <Link style={{textDecoration:'none'}} to={`/playlist/${e.id}`}><HomeBoxes prop={e} /></Link>
                  })}
                  
                   
                </div>

            </Popular>
           
            <Popular>
                <h2></h2>
                <span>SEE ALL</span>
                <div>
                { (salena.slice(0,4)).map((e)=>{
                    return <Link style={{textDecoration:"none"}} to={`/playlist/${e.id}`}><HomeBoxes prop={e} /></Link>
                  })}
                  
                   
                </div>

            </Popular>
            <Popular>
                <h2></h2>
                <span>SEE ALL</span>
                <div>
                { (throwback.slice(0,4)).map((e)=>{
                    return <Link style={{textDecoration:"none"}} to={`/playlist/${e.id}`}><HomeBoxes prop={e} /></Link>
                  })}
                  
                   
                </div>

            </Popular>
            <Popular>
                <h2></h2>
                <span>SEE ALL</span>
                <div>
                { (throwback.slice(0,4)).map((e)=>{
                    return <HomeBoxes prop={e} />
                  })}
                  
                   
                </div>

            </Popular>
            <Popular>
                <h2></h2>
                <span>SEE ALL</span>
                <div>
                { (throwback.slice(0,4)).map((e)=>{
                    return <HomeBoxes prop={e} />
                  })}
                  
                   
                </div>

            </Popular>
            </div>


           
        </div>
    )
}