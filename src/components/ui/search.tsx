import React from 'react';
import { Input } from 'antd';
import '@/styles/components/Search.scss';

const Search: React.FC = () => (
    <Input size="large" placeholder="Tìm kiếm nội dung của bạn" prefix={<i className="ri-search-line icon-search"></i>} className="search-input" />
);

export default Search;