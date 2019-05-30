import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getContacts} from '../../actions/contactsActions';
import {Grid, GridColumn, Header, Loader} from 'semantic-ui-react';
import ContactItem from './ContactItem';

class ContactsList extends Component {

  componentDidMount() {
    this.props.getContacts(null);
  }

  render() {
    let content = <Header as="h1">Empty</Header>;
    if (this.props.contacts.length) {
      if (this.props.loading) {
        content = <Loader active size='medium'>Loading</Loader>
      } else {
        content = this.props.contacts.filter(contact=> {
          for(let key in contact){
            if(contact[key].toString().includes(this.props.searchText)){
              return true;
            }
          }return false;

        }).map(contact => (
        	<GridColumn key={contact.hash}>
        			<ContactItem contact={contact} />
        		</GridColumn>
        ));
      }
    }

    return (
      <Grid columns={4}>
        {content}
      </Grid>
    );
  }
};

ContactsList.propTypes = {
  loading: PropTypes.bool,
  contacts: PropTypes.array,
  getContacts: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    contacts: state.contacts.contacts
  };
}

export default connect(mapStateToProps, {getContacts})(ContactsList);