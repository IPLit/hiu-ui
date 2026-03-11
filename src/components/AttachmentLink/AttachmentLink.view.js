import React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import Config from "../../Config";

const AttachmentLink = ({ consentReqId, attachmentPath, linkTitle }) => {
  const openAttachment = async e => {
    // e.preventDefault();

    const response = await axios({
      headers:{ Authorization: localStorage.getItem('auth-token') },
      method: 'get',
      url: `/health-information/fetch/${consentReqId}${attachmentPath}`,
      baseURL: Config.BACKEND_BASE_URL + Config.BACKEND_API_PATH,
      responseType: 'blob',
      cache: false
    });

    const blob = response.data;
    const fileUrl = URL.createObjectURL(blob);
    const attachmentName = attachmentPath.split('/').reverse()[0];

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = attachmentName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <a href="#" onClick={openAttachment}>{linkTitle}</a>;
};

AttachmentLink.propTypes = {
  consentReqId: PropTypes.string,
  attachmentPath: PropTypes.string,
  linkTitle: PropTypes.string
};

export default AttachmentLink;
