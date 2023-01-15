// @ts-nocheck

import type { NextPage } from 'next';
import { FileUploader } from 'react-drag-drop-files';
import { ChangeEvent, useEffect, useState } from 'react';
import ImageCard from '../components/ImageCard';
import {
  FormElement,
  Grid,
  Input,
  Spacer,
  Checkbox,
  Button,
} from '@nextui-org/react';
import CatSelect from '../components/CatSelect';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddArt: NextPage = () => {
  const [image, setImage] = useState('favicon.ico');
  const [title, setTitle] = useState('Display title of image');
  const [desc, setDesc] = useState('A bunch of words describing something.');
  const [display, setDisplay] = useState(true);
  const [cats, setCats] = useState([{ id: 1, displayName: 'Coloring Book' }]);
  const [cat, setCat] = useState({id:0,displayName:'Select a Category'});
  const [file, setFile] = useState();
  const [disableBtnGroup, setDisbaleButtonGroup] = useState(true);

  const fileTypes = ['JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];

  useEffect(() => {
    axios
      .get('/api/backend/download/categories')
      .then((response) => {
        console.log(response);
        setCats(response.data);
      })
      .catch((err) => console.log('err',err))
      .finally(() => {        
        if (cats.length == 0) {
          setCats([{id:0,displayName:'ERROR'}]);
        }
      });
  });
  const handleDone = async () => {
    const imageId = uuidv4();
    const imgUp = await axios
      .post('/api/backend/upload', {
        id: imageId,
        displayName: title,
        description: desc,
        display,
        cats:cat
      }).then(res => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    let { data } = await axios.post('/api/s3/upload', {
      name: imageId + file.name.substring(file.name.lastIndexOf('.')),
      type: file.type,
    });

    const dataUp = axios
      .put(data.url, file, {
        headers: {
          'Content-type': file.type,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .catch((err) => {
        console.error(err);
      });

    await Promise.all([dataUp, imgUp]).then((res) => {
      setImage('favicon.ico');
      setTitle('');
      setDesc('');
      setDisbaleButtonGroup(true);
    });
  };
  const handleChange = async (file: Blob) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onloadend = () => {
      setImage(fr.result);
      setTitle(file.name.substring(0, file.name.indexOf('.')));
    };
    setFile(file);
    setDisbaleButtonGroup(false);
  };


 
  const handleTitleChange = (e: ChangeEvent<FormElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: ChangeEvent<FormElement>) => {
    setDesc(e.target.value);
  };

  const handleSelectionChange = (e) => {
    setCat(cats[parseInt(e.currentKey) - 1]);
  };

  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid style={{ margin: '30px', marginTop: '100px' }}>
          <ImageCard
            props={{
              image: image,
              displayTitle: title,
              description: desc,
            }}
          />
        </Grid>
        <Grid style={{ margin: '30px', marginTop: '100px' }}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          <Spacer y={2.5} />
          <CatSelect data={cats} handler={handleSelectionChange} selection={cat}/>
          <Spacer y={2.5} />
          <Input
            clearable
            bordered
            labelPlaceholder="Title"
            initialValue={title}
            width="400px"
            onChange={handleTitleChange}
          />
          <Spacer y={1.5} />
          <Input
            clearable
            bordered
            labelPlaceholder="Description"
            initialValue={desc}
            width="400px"
            onChange={handleDescChange}
          />
          <Spacer y={1.5} />

          <Checkbox defaultSelected onChange={setDisplay}>
            Display in gallery
          </Checkbox>
          <Spacer y={1.5} />
        </Grid>
      </Grid.Container>
      <Grid.Container justify="center" gap={2}>
        <Button.Group color="success" ghost disabled={disableBtnGroup}>
          <Button onClick={handleDone}>+ Next</Button>
          <Button onClick={handleDone}>Done</Button>
        </Button.Group>
      </Grid.Container>
    </>
  );
};

export default AddArt;
