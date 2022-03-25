import React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonLoader ({ loading, fetchData }) {
  return (
    <button type="submit" className="border border-gray-500 p-2 rounded-lg w-auto mr-auto shadow-md" onClick={fetchData}
            disabled={loading}>
      {loading ?
        <FontAwesomeIcon icon={faSpinner} className="button-icon spinner"/> : `Send Message`
      }
    </button>
  );
}

export default ButtonLoader;