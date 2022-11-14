// @ts-nocheck

import { Dropdown } from '@nextui-org/react';
import React, { useState } from 'react';

const CatSelect = ({ data }) => {
  const [selectedKey, setSelectedKey] = useState(-1);
  const menuItems = [];
  for (let i = 0; i < data.length; i++) {
   
    menuItems.push({
      key: data[i].id,
      name: data[i].displayName,
      withDivider: false,
      color: 'default'
    });
  }
  

  const handleSelectionChange = (e) => {
    
    setSelectedKey(parseInt(e.currentKey)-1);
    
  };

  return (
    <Dropdown>
      <Dropdown.Button shadow css={{ w: '400px' }}>
        {menuItems[selectedKey]?.name || 'Select a Category'}
      </Dropdown.Button>
      <Dropdown.Menu
        disallowEmptySelection
        selectionMode="single"
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
  );
};

export default CatSelect;
