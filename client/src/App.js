import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width:'100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto", 
  },
  table: {
    minWidth: 1080
  }
})

class App extends Component {

  //state는 component에 대해서 변경될 수 있는 변수를 처리할 때 쓴다.
  state = {
    customers: ""
  }

  //api에 접근해서 데이터를 받아오는 작업을 한다.
  //component가 mount를 완료 했을 때, 실행되는 부분. 
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers:res})) //callApi에서 받은 데이터(res)를 state의 customers에 넣어준다.
      .catch(err => console.log(err));
  }
//api를 불러온다. 비동기적으로 수행한다.
  callApi = async () => {
    //해당 주소로 접근해서.
    const response = await fetch('/api/customers');
    //json 형태로 받아서 body라는 변수로 받아오고 그것을 리턴한다.
    const body = await response.json();
    return body;
  }

  render() {
    const { classes } = this.props; //props는 변경될 수 없는 데이터를 명시할 때 쓴다.
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.name} gender={c.gender} job={c.job}/> ); 
            }) : ""}  
            {/* this.state.customers가 있으면 돌고, 없으면 공백으로 처리하겠다. */}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
