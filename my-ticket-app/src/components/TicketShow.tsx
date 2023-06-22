import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from "react-router-dom";
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import TicketForTable from './TicketForTable';
import Button1 from '@mui/material/Button';
import Highlighter from 'react-highlight-words';
import type { ColumnType, ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { Button, Space, Table, InputRef, TableProps, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/es/table/interface';

import "./review.css"

interface DataType {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    Title: string;
    Description: string;
    TicketInformation: {
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
        EventDate: string;
        EventTime: string;
        Venue: string;
        TicketPrice: number;
        Sales: string;
        Restrictions: string;
        TermsConditions: string;
    };
    ContactInformation: {
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
        Email: string;
        Phone: string;
        Address: string;
    };
    Status: {
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
        StatusName: string;
    };
}
type DataIndex = keyof DataType;

function TicketShow() {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [tickets, setTickets] = useState<DataType[]>([]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearSorts = () => {
        setSortedInfo({});
    };

    const setIDSort = () => {
        if (sortedInfo.columnKey === 'ID' && sortedInfo.order === 'ascend') {
            setSortedInfo({
                order: 'descend',
                columnKey: 'ID',
            });
        } else {
            setSortedInfo({
                order: 'ascend',
                columnKey: 'ID',
            });
        }
    };

    const getListTickets = async () => {
        const apiUrl = 'http://localhost:8080/ListTickets';
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setTickets(res.data);
                }
            });
    };

    useEffect(() => {
        getListTickets();
    }, []);

    const handleButtonClick = (record: DataType) => {
        // Handle button click event
        console.log('Button clicked for record:', record);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Ticket',
            dataIndex: 'Ticket',
            key: 'Ticket',
            width: '30%',
            render: (_, record) => {
                return <div >
                    <TicketForTable record={record} />
                </div>;
            },
        },
        {
            title: 'Title',
            dataIndex: 'Title',
            key: 'Title',
            width: '15%',
            ...getColumnSearchProps('Title'),
            sorter: (a, b) => a.Title.localeCompare(b.Title),
            sortOrder: sortedInfo.columnKey === 'Title' ? sortedInfo.order : null,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            width: '15%',
            sorter: (a, b) => a.CreatedAt.localeCompare(b.CreatedAt),
            sortOrder: sortedInfo.columnKey === 'CreatedAt' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => (
                <span>{dayjs(record.CreatedAt).format('YYYY/MM/DD HH:mm:ss')}</span>
            ),
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'UpdatedAt',
            key: 'UpdatedAt',
            width: '15%',
            sorter: (a, b) => a.UpdatedAt.localeCompare(b.UpdatedAt),
            sortOrder: sortedInfo.columnKey === 'UpdatedAt' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => (
                <span>{dayjs(record.UpdatedAt).format('YYYY/MM/DD HH:mm:ss')}</span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: '25%',
            sorter: (a, b) => a.Status.StatusName.localeCompare(b.Status.StatusName),
            sortOrder: sortedInfo.columnKey === 'Status' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => (
                <span>{record.Status.StatusName}</span>
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'Edit',
            key: 'Edit',
            width: '15%',
            render: (_, record) => {
                const handleButtonClick = () => {
                    console.log(record.ID);
                    // Save the record in localStorage
                    localStorage.setItem('recordID', record.ID.toString());
                };

                return (
                    <Button1
                        onClick={handleButtonClick}
                        component={RouterLink}
                        to="/TicketUpdateForm"
                    >
                        Edit
                    </Button1>
                );
            },
        },

    ];

    return (


        <Container maxWidth="xl" sx={{ alignContent: 'center', marginTop: 20 }}>
            <Space style={{ marginBottom: 16 }}>

                <Button
                    type="primary"
                    danger
                    onClick={(e) => window.location.href = "/TicketForm"}
                >
                    New Ticket
                </Button>
                <Button onClick={clearSorts}>Clear sorters</Button>
            </Space>
            <Table
                columns={columns}
                dataSource={tickets}
                onChange={handleChange}
                pagination={{ pageSize: 2 }}
                scroll={{ y: '72vh' }} />
        </Container>
    );
}

export default TicketShow;
