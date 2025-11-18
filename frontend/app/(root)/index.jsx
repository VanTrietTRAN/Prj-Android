import { useEffect,useState } from 'react'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'
import { Text, View, Image, TouchableOpacity, FlatList,Alert, RefreshControl } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SignOutButton } from '../../components/SignOutButton.jsx'
import { useTransactions } from '../../hooks/useTransactions.js'
import PageLoader from '../../components/PageLoader.jsx'
import { styles } from '../../assets/styles/home.styles.js'
import { BalanceCard } from '../../components/BalanceCard.jsx'
import { TransactionItem } from '../../components/TransactionItem.jsx'
import NoTransactionsFound from '../../components/NoTransactionFound.jsx'


export default function Page() {
  const { user } = useUser()
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(user.id); 

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }
  
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (id) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => deleteTransaction(id) }
    ])
  } 

  if (isLoading && refreshing) return <PageLoader />

  return (
      <View style={styles.container}>
        <View style={styles.content}>
        {/*header */}
        <View style={styles.header}>
          {/*left */}
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernamText}>
                {user?.emailAddresses[0]?.emailAddress.split('@')[0]}
              </Text>
            </View>
          </View>
          {/* right */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary} />

          <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      {/* FlatList is a performant way to render long lists in React Native */}
      {/* it renders items lazily - only those on the screen  */}

      <FlatList
        style={styles.transactionList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />


    </View>
  );
}