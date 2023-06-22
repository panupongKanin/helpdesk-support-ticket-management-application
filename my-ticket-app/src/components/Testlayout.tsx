import React, { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import TicketForTable from './TicketForTable';
import CssBaseline from '@mui/material/CssBaseline';

import "./sTicket.css"
import { Box } from '@mui/system';


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

function Testlayout() {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [tickets, setTickets] = useState<DataType[]>([]);






    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
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
            //{dayjs(checkedPaymentsAll.Payment.OrderTech.ORDER.CreatedAt).format('DD/MM/YYYY HH:mm:ss')}
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
            //{dayjs(checkedPaymentsAll.Payment.OrderTech.ORDER.CreatedAt).format('DD/MM/YYYY HH:mm:ss')}
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
            render: (_, record) => (
                <Button type="primary" danger style={{ width: '50%' }} onClick={() => handleButtonClick(record)}>Edit</Button>
            ),
        },
    ];

    return (


        // <form className='form-container'>
        //     {/* <Ticket  /> */}
        //     <div className='text-start'>
        //         <Container maxWidth="xl" sx={{ alignContent: 'center', marginTop: 20 }}>
        //             <Space style={{ marginBottom: 16 }}>
        //                 <Button type="primary" danger>New Ticket</Button>
        //                 <Button onClick={setIDSort}>Sort ID</Button>
        //                 <Button onClick={clearFilters}>Clear filters</Button>
        //                 <Button onClick={clearAll}>Clear filters and sorters</Button>
        //             </Space>
        //             <Table columns={columns} dataSource={tickets} onChange={handleChange} />
        //         </Container></div>
        // </form >

        <Box>
            <Box id='reviewShowFrame'>
                <Container maxWidth="xl" sx={{ alignContent: 'center', marginTop: 20}}>
                    <Space style={{ marginBottom: 16 }}>
                        <Button type="primary" danger>New Ticket</Button>
                        <Button onClick={setIDSort}>Sort ID</Button>
                        <Button onClick={clearFilters}>Clear filters</Button>
                        <Button onClick={clearAll}>Clear filters and sorters</Button>
                    </Space>
                    <Table columns={columns} dataSource={tickets} onChange={handleChange} />
                </Container>
            </Box>
        </Box >




    );
}

export default Testlayout;
