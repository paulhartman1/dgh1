import { Dropdown } from '@nextui-org/react';
import React, { useState } from 'react';

const CatSelect = () => {
  const menuItems = [
    { key: 'cp', name: 'Colored Pencil', withDivider: false, color: 'default' },
    { key: 'cb', name: 'Coloring Book', withDivider: false, color: 'default' },
    {
      key: 'fp',
      name: 'Facepainting    ',
      withDivider: false,
      color: 'default',
    },
    { key: 'new', name: ' New Category', withDivider: true, color: 'error' },
  ];

  
  const [selected, setSelected] = useState('Categories');

  const handleSelectionChange = (e) => {
    const selection = menuItems.map(mi => mi.key == e.currentKey)
    console.log(selection);
    
    console.log(e);
    
  }

  return (
    <Dropdown >
      <Dropdown.Button shadow css={{ w: '400px' }}>
        {selected}
      </Dropdown.Button>
      <Dropdown.Menu
        disallowEmptySelection
        selectionMode="multiple"
        items={menuItems}
        onSelectionChange={handleSelectionChange}
      >
        {(item) => (
          <Dropdown.Item
            withDivider={item.withDivider}
            key={item.key}
            color={item.color}
          >
            {item.name}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )


  
}

export default CatSelect;
