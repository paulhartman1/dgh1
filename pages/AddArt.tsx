// @ts-nocheck

import type { NextPage } from 'next';
import { FileUploader } from 'react-drag-drop-files';
import { ChangeEvent, useState } from 'react';
import ImageCard from '../components/ImageCard';
import { FormElement, Grid, Input, Spacer, Checkbox } from '@nextui-org/react';
import CatSelect from '../components/CatSelect';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const AddArt: NextPage = () => {
  const [image, setImage] = useState('favicon.ico');
  const [title, setTitle] = useState('Display title of image');
  const [desc, setDesc] = useState('A bunch of words describing something.');

  const fileTypes = ['JPG', 'JPEG', 'PNG', 'GIF', 'SVG'];

  const handleChange = async (file: Blob) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onloadend = () => {
      setImage(fr.result);
      setTitle(file.name.substring(0,file.name.indexOf('.')))
    };

    let { data } = await axios.post('/api/s3/upload', {
      name: uuidv4() + file.name.substring(file.name.lastIndexOf('.')),
      type: file.type,
    });

    await axios
      .put(data.url, file, {
        headers: {
          'Content-type': file.type,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTitleChange = (e: ChangeEvent<FormElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: ChangeEvent<FormElement>) => {
    setDesc(e.target.value);
  };

  return (
    <Grid.Container gap={2} justify="center">
      <Grid>
        <ImageCard
          props={{
            image: image,
            displayTitle: title,
            description: desc,
          }}
        />
      </Grid>
      <Grid style={{ margin: '50px', marginTop: '100px' }}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <Spacer y={2.5} />
        <CatSelect />
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
          initialValue="A bunch of words describing something."
          width="400px"
          onChange={handleDescChange}
        />
        <Spacer y={1.5} />

        <Checkbox defaultSelected>Display in gallery</Checkbox>
      </Grid>
    </Grid.Container>
  );
};

export default AddArt;
