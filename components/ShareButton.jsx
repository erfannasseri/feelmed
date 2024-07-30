import React from 'react'
import {
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon
} from 'react-share'

const ShareButton = ({Packages}) => {

  const ShareURL= `${process.env.NEXT_PUBLIC_DOMAIN}/packages/${Packages._id}`
  
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
          Share this package
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <TwitterShareButton
          url={ShareURL}
          qoute={`${Packages.title} \n${Packages.description}`}
        >
          <TwitterIcon size={40} round={true}/>
        </TwitterShareButton>
        <TelegramShareButton
          url={ShareURL}
          title={`${Packages.title} \n${Packages.description}`}
        >
          <TelegramIcon size={40} round={true}/>
        </TelegramShareButton>
        <WhatsappShareButton
          url={ShareURL}
          title={`${Packages.title} \n${Packages.description}`}
        >
          <WhatsappIcon size={40} round={true}/>
        </WhatsappShareButton>
        <LinkedinShareButton
          url={ShareURL}
          title ={`${Packages.title}`}
          summary ={Packages.description}
        >
          <LinkedinIcon size={40} round={true}/>
        </LinkedinShareButton>
        <EmailShareButton
          url={ShareURL}
          subject={Packages.title}
          body={`${Packages.title} \n${Packages.description}`}
        >
          <EmailIcon size={40} round={true}/>
        </EmailShareButton>
      </div>
    </>
  )
}

export default ShareButton