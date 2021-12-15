import { useEffect, useState } from "react"
import { getTokenFromResponse } from "../spotifyApi"
import styled from "styled-components";
import { Sidebar } from "./Sidebar ";
import SpotifyWebApi from "spotify-web-api-js";
import { Songs } from "./Songs";
const spotifyApi = new SpotifyWebApi();


export function Artist() {

    const [token, setToken] = useState("")
    const [artist, setArtist] = useState({});
    const [follow, setFollow] = useState(false);
    const [artistTrack, setArtistTrack] = useState({});

    useEffect(() => {
        let hash = getTokenFromResponse()
        setToken(hash.access_token)
        spotifyApi.setAccessToken(token)
        spotifyApi.getMe().then((user) => {
            console.log(user)
        });

        spotifyApi.getArtist('0C8ZW7ezQVs4URX5aX7Kqx')
            .then(function (data) {
                setArtist(data);
                console.log('Artist information', data);
            }, function (err) {
                console.error(err);
            });

        // Get an artist's top tracks
        spotifyApi.getArtistTopTracks('0C8ZW7ezQVs4URX5aX7Kqx', 'IN')
            .then(function (data) {
                setArtistTrack(data);
                console.log("tracks", data);
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }, [token]);

    return <Layout>
        <Sidebar />
        <Back>
            <div><img src="http://localhost:3000/vectorverified.svg" alt="verified" /><span>Verified Artist</span></div>
            <h1>{artist.name}</h1>
            {/* <p>{artist.followers.total} monthly listeners</p> */}
        </Back>
        <Content>
            <Controls>
                <div><img src="http://localhost:3000/VectorPlay.svg" alt="play" /></div>
                <div onClick={() => setFollow(!follow)}>{follow ? "following" : "follow"}</div>
                <div><img src="http://localhost:3000/MoreTripledots.svg" alt="triple dots" /></div>
            </Controls>
            <SandAP>
                <div>
                    <h2>Popular</h2>
                    {/* {artistTrack.tracks.map((song) =>
                        <Songs song={song} />
                    )} */}
                </div>
                <div><h2>Artist Pick</h2></div>
            </SandAP>
        </Content>
    </Layout>
}

const Layout = styled.div`
font-family: 'Montserrat', sans-serif;
    margin: 0px 0px 0px 0px;
`;

const Back = styled.div`
    padding-left: 28px;
    margin-left:200px;
    width:100%;
    height: 400px;
    background-image: url("http://localhost:3000/selena.svg"), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.59) 100%); 
    background-blend-mode: lighten;

    &>div{
        padding-top: 210px;
        display:flex;
        align-items:center;
    }
    & > h1{
        margin:0px;
        font-size:96px;
        line-height:120px;
        color: #FFFFFF;
        font-weight: 700;
    }
    & > div>span{
        padding-left:3px;
    }
    & > div>span,
    & > p{
        margin:0px;
        font-weight:400;
        font-size:14px;
        color: #FFFFFF;
        line-height:17.07px;
    }
`;

const Content = styled.div`
    margin-left:200px;
    width: 100%;
    height: 864px;
    background: #121212;
    padding-left:32px;
    padding-top:20px;
`;

const Controls = styled.div`
    width:250px;
    height: 56px;
    display:flex;
    align-items:center;

    &>div:nth-child(1){
        width:56px;
        height:56px;
        border-radius: 28px;
        background-color:#1DB954;
    }
    &>div:nth-child(1)>img{
        position: relative;
        left: 40%;
        top: 35%;
        transform:scale(1.3)

    }
    &>div:nth-child(1):hover{
        transform:scale(1.1);
    }
    &>div:nth-child(2){
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #ffffffb2;
        padding:8px;
        border: 2px solid #ffffffb2;
        border-radius: 4px;
        margin-left: 32px;
    }
    &>div:nth-child(2):hover{
        color:#FFFFFF;
        border: 2px solid #FFFFFF;
    }
    &>div:nth-child(3){
        margin-left:34px;
    }
`;

const SandAP = styled.div`
    margin-top:30px;
    display:flex;
    width: 1180px;
    &>div>h2{
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: -0.05em;
        text-transform: capitalize;
        color: #FFFFFF;
    }
    &>div:nth-child(1){
        flex-grow:4
    }
    &>div:nth-child(2){
        flex-grow:1
    }
`;