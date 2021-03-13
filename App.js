import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  }

  return (
    <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
          <View style={{ alignSelf: 'center', margin: 5, flexDirection: 'row' }}>
            <Text style={{ fontSize: 18 }}>{item.name} {item.phoneNumbers[0].number}</Text>
          </View>}
        data={contacts}
      />
      <Button title="Get Contacts" onPress={getContacts}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});
