import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width:'100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

/*

component life cycle

  1) constructor()
  2) componentWillMount()
  3) render()
  4) componentDidMount()

*/

/*

props or state => shouldComponentUpdate()
: props 혹은 state가 변경되는 경우에는, shouldComponentUpdate함수가 사용되어 다시 render()를 호출하여 뷰를 갱신해준다.
: react는 상태의 변화를 알아서 감지를 해서 화면을 다시 재구성해주므로, 프로그래머는 상태만 잘 관리해주면 된다.
*/

class App extends Component {

  //state는 component에 대해서 변경될 수 있는 변수를 처리할 때 쓴다.
  state = {
    customers: "",
    completed:0
  }

  //api에 접근해서 데이터를 받아오는 작업을 한다.
  //component가 mount를 완료 했을 때, 실행되는 부분. 
  componentDidMount() {
    this.timer = setInterval(this.progress, 800); //0.02초마다 한번씩 프로그래스가 실행되도록 설정한다.
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

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 10});
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
            }) : 
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
              </TableCell>
            </TableRow>
            }  
            {/* this.state.customers가 있으면 돌고, 없으면 공백으로 처리하겠다. */}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
