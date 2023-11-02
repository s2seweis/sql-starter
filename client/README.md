<!-- const addUserData = async e => {
    console.log ('line:11', e);
    e.preventDefault ();

    var formData = new FormData ();
    formData.append ('photo', file);
    formData.append ('fname', fname);
    formData.append ('image', imagenew);
    formData.append ('add', test);

    console.log ('line:11.1', file);
    console.log ('line:11.2', formData);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post ('/register', formData, config);

    console.log ('line:12', res);
    console.log ('line:13', formData);
    console.log ('line:14', config);

    if (res.data.status === 401 || !res.data) {
      console.log ('errror');
    } else {
      // history("/")
      console.log ('line:15, !success!');
    }
  }; -->