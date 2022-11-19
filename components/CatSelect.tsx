// @ts-nocheck

import { Dropdown } from '@nextui-org/react';
import React, { useReducer, useState } from 'react';

const CatSelect = ({ data, handler, selection }) => {
  const menuItems = [];

  for (let i = 0; i < data.length; i++) {
    menuItems.push({
      key: data[i].id,
      name: data[i].displayName,
      withDivider: false,
      color: 'default',
    });
  }

  return (
    <Dropdown>
      <Dropdown.Button shadow css={{ w: '400px' }}>
        {selection?.displayName || 'Select a Category'}
      </Dropdown.Button>
      <Dropdown.Menu
        disallowEmptySelection
        selectionMode="single"
        items={menuItems}
        onSelectionChange={handler}
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
