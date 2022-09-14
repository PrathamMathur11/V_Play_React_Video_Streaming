import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { demoThumbnailUrl } from '../utils/constants'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState([])
  const [videos, setVideos] = useState([])

  const { id } = useParams()

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`)

      if (data) {
        setChannelDetail(data?.items[0])
      } else {
        console.error()
      }

      const videosData = await fetchFromAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      )
      if (videosData) {
        setVideos(videosData?.items)
      } else {
        console.error()
      }
    }

    fetchResults()
  }, [id])



  const Background =
    channelDetail?.brandingSettings?.image?.bannerExternalUrl 
    ||
    demoThumbnailUrl

  return (
    <Box minHeight='95vh'>
      <Box>
        <div
          style={{
            
            background: `url(${Background})`,
          
            backgroundRepeat: 'no-repeat !important',
            backgroundSize: 'cover !important',
            width: '100%',
            zIndex: 10,
            height: 'calc((100vw - 240px)/6.2 - 1px)',
            minHeight: '100px'
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-93px' />
      </Box>
      <Box p={2} display='flex'>
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
