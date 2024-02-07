const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Kalikan dengan 1000 karena timestamp dihitung dalam milidetik

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tambahkan 1 karena bulan dimulai dari 0
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return formattedDate
}

export default function TransactionTable({ transactions }) {
    const date = timestampToDate(transactions[0].order_detail.order_date.seconds)
    return (
        <div>hello world</div>
    )
}