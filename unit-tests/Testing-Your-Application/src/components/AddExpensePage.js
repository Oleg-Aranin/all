import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses';

// export class AddExpensePage extends React.Component {
//     onSubmit = (expense) => {
//         this.props.onSubmit(expense);
//         this.props.history.push('/');
//     }
//
//     render() {
//         return (
//             <div>
//                 <h1>Add Expense</h1>
//                 <ExpenseForm
//                     onSubmit={this.onSubmit}
//                 />
//             </div>
//         )
//     }
// }

export const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={(expense) => {
                props.addExpense(expense);
                props.history.push('/');
            }}
        />
    </div>
);


export default connect(null, {addExpense})(AddExpensePage);
