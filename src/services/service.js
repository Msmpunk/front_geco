import axios from 'axios';

export const loginApp = async (username, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:8102/api/login/v1', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Network Error');
  }
};

export const getCorpus = async () => {
  try {
    const token = localStorage.getItem('custom-auth-token');
    const response = await axios.get('http://127.0.0.1:8102/api/get/corpus_publicos/', {
      headers: {
        'Authorization': `Token ${token}`
      }
    });

    if (response.status === 200) {
      return {
        data: response.data.data.proyectos,
        status: true
      };
    }else{
      return {
        status: false
      }
    }
    
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Network Error');
  }
};


export const getCorpusDocuments = async (id) => {
  try {
    const token = localStorage.getItem('custom-auth-token');
    const response = await axios.get('http://127.0.0.1:8102/api/get_corpus_publico/'+id, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });

    if (response.status === 200) {
      return {
        data: response.data.data,
        status: true
      };
    }else{
      return {
        status: false
      }
    }
    
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Network Error');
  }
};

export const getCorpusDocumentsText = async (id, selectedRows) => {
  try {
    const token = localStorage.getItem('custom-auth-token');
    const response = await axios.post(
      `http://127.0.0.1:8102/api/get_text/${id}`,
      { data: selectedRows },  // Cuerpo de la solicitud
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        responseType: 'blob'
      }
    );
    if (response.status === 200) {
      return {
        data: response.data,
        status: true
      };
    } else {
      return {
        status: false
      };
    }

  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Network Error');
  }
};

export const getCorpusDocumentsPos = async (id, selectedRows) => {
  try {
    const token = localStorage.getItem('custom-auth-token');
    const response = await axios.post(
      `http://127.0.0.1:8102/api/get_text_pos/${id}`,
      { data: selectedRows },  // Cuerpo de la solicitud
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        responseType: 'blob'
      }
    );
    if (response.status === 200) {
      return {
        data: response.data,
        status: true
      };
    } else {
      return {
        status: false
      };
    }

  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Network Error');
  }
};

export const getCorpusDocumentsAdjuntos = async (id, selectedRows) => {
  try {
    const token = localStorage.getItem('custom-auth-token');
    const response = await axios.post(
      `http://127.0.0.1:8102/api/get_text_adjuntos/${id}`,
      { data: selectedRows },  // Cuerpo de la solicitud
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        responseType: 'blob'
      }
    );
    if (response.status === 200) {
      return {
        data: response.data,
        status: true
      };
    } else {
      return {
        status: false
      };
    }

  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Network Error');
  }
};