import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";
import {Helmet} from "react-helmet";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import OdberatelService from "../../service/OdberatelService";
import {toast, ToastContainer} from "react-toastify";
import Loader from "react-loader-spinner";
import SortingSelect from "../infrastucture/SortingSelect";
import 'react-toastify/dist/ReactToastify.css';

class ListOdberatelComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            odberatelePaging: {
                odberatele: [],
                totalCount: 0,
            },
            isLoading: true,
            pageNo: 0,
            pageSize: 5,
            sortAsc: true,
            sortBy: 'id',
        }
    }

    componentDidMount() {
        const {pageNo, pageSize, sortAsc, sortBy} = this.state
        this.fetchFakturaList(pageNo, pageSize, sortAsc, sortBy);
    }

    fetchFakturaList = (pageNo, pageSize, sortAsc, sortBy) => {
        OdberatelService.fetchOdberatele(pageNo, pageSize, sortAsc, sortBy)
            .then((res) => {
                this.setState({odberatelePaging: res.data.result, isLoading: false})
            });
    }

    deleteOdberatel = (id) => {
        OdberatelService.deleteOdberatel(id)
            .then(res => {
                toast(res.data.message);
                this.setState(prevState =>
                    ({...prevState,
                    odberatelePaging:
                        {
                            ...prevState.odberatelePaging,
                            odberatele: this.state.odberatelePaging.odberatele.filter(odberatel => odberatel.id !== id)
                        }
                    })
                );
            })
    }

    editOdberatel = (id) => {
        this.props.history.push('/edit-subscriber/' + id);
    }

    addOdberatel = () => {
        this.props.history.push('/add-subscriber');
    }

    changePage = (event, value) => {
        const {pageSize, sortAsc, sortBy} = this.state
        this.setState({pageNo: value - 1});
        this.fetchFakturaList(value - 1, pageSize, sortAsc, sortBy);
    }

    changeSortBy = (event) => {
        const {pageNo, pageSize, sortAsc} = this.state
        this.setState({sortBy: event.target.value});
        this.fetchFakturaList(pageNo, pageSize, sortAsc, event.target.value);
    }
    changeSortAsc = (event) => {
        const {pageNo, pageSize, sortBy} = this.state
        this.setState({sortAsc: event.target.value});
        this.fetchFakturaList(pageNo, pageSize, event.target.value, sortBy);
    }

    render() {
        const order = [
            {
            name: "Odběratel",
            value: this.state.sortBy,
            handleChange: this.changeSortBy,
            items:
                [
                    {value: "id", text: "None"},
                    {value: "firma", text: "Firma"},
                    {value: "ic", text: "IČO"},
                    {value: "psc", text: "PSČ"},
                    {value: "mesto", text: "Město"},
                    {value: "ulice", text: "Ulice"},
                    {value: "cisloPopisne", text: "Číslo Popisné"}
                ]
            },
            {
                name: "Vzestupně/Sestupně",
                value: this.state.sortAsc,
                handleChange: this.changeSortAsc,
                items:
                    [
                        {value: "true", text: "Vzestupně"},
                        {value: "false", text: "Sestupně"},
                    ]
            },

        ]
        return (
            <React.Fragment>
                <ToastContainer/>
                <Helmet>
                    <title>Seznam odběratelů</title>
                </Helmet>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Seznam odběratelů</Typography>
                    <Loader style={style} type="Grid" color="blue" visible={this.state.isLoading}/>
                    {!this.state.isLoading &&
                    <React.Fragment>
                        <SortingSelect order={order}/>
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Firma</TableCell>
                                <TableCell align="left">IČO</TableCell>
                                <TableCell align="left">PSČ</TableCell>
                                <TableCell align="left">Město</TableCell>
                                <TableCell align="left">Ulice</TableCell>
                                <TableCell align="left">Číslo popisné</TableCell>
                                <TableCell align="left">Akce</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.odberatelePaging.odberatele.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">{row.firma}</TableCell>
                                    <TableCell align="left">{row.ic}</TableCell>
                                    <TableCell align="left">{row.psc}</TableCell>
                                    <TableCell align="left">{row.mesto}</TableCell>
                                    <TableCell align="left">{row.ulice}</TableCell>
                                    <TableCell align="left">{row.cisloPopisne}</TableCell>
                                    <TableCell align="left"><CreateIcon cursor='pointer' onClick={() => this.editOdberatel(row.id)} />&nbsp;<DeleteIcon cursor='pointer' onClick={() => this.deleteOdberatel(row.id)}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        <Pagination style={paginationStyle} count={Math.ceil(this.state.odberatelePaging.totalCount / this.state.pageSize)} page={this.state.pageNo + 1} onChange={this.changePage} />
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.addOdberatel}>
                        Nový Odběratel
                        </Button>
                    </React.Fragment>
                    }
                </Container>
            </React.Fragment>
        );
    }

}
const style = {
    display: 'flex',
    justifyContent: 'center'
}
const paginationStyle = {
    display: 'flex',
    justifyContent: 'flex-end'
}
export default ListOdberatelComponent;
