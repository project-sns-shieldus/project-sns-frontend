import React from 'react'
import '../css/Profile.css'

export default function Profile() {
    return (
        <div className='profile-container'>
            <div className='profile-box'>
                <div className='user-info'>
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'></img>
                    <div className='user-detail'>
                        <p className='user-name'>username</p>
                        <br/>
                        <div className='posts-and-follows'>
                            <div>
                                <p>000</p>
                                <p>게시물</p>
                            </div>
                            <div>
                                <p>000</p>
                                <p>팔로워</p>
                            </div>
                            <div>
                                <p>000</p>
                                <p>팔로잉</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr className='separate-line'/>

                <div className='posts'>
                    <img src='https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg'/>
                    <img src='https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg'/>
                    <img src='https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg'/>
                    <img src='https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg'/>
                    <img src='https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg'/>
                    <img src='https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg'/>
                </div>
            </div>
        </div>
    )
}
