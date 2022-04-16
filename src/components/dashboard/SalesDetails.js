import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getSaleProducts } from 'src/services/salesService';

const useStyles = makeStyles({
    container: {
        margin: "30px 0",
        maxHeight: 585,
    },
});

export default function SalesDetails(props) {
    const classes = useStyles();
    let context = props.context;

    const [saleProducts, setSaleProducts] = React.useState([]);

    useEffect(() => {
        getSaleProducts(props.detailsData["id"], (response) => {
            setSaleProducts(JSON.parse(response));
        }, (error) => {
            console.log(error);
        })
    }, []);

    //const [salePrice, setSalePrice] = React.useState(0);
    let salePrice = 0

    return (
        <Dialog open={true} onClose={props.handleClose} maxWidth={'lg'} scroll={"body"}>
            <DialogContent>
                <Grid container >
                    <Grid item xs={12}>
                        <Typography variant="h1">Detalhes da refeição</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TableContainer className={classes.container} >
                            <Table stickyHeader aria-label="sticky table" style={{ textAlign: 'center' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Produto </TableCell>
                                        <TableCell> Quantidade </TableCell>
                                        <TableCell> Preço/Un </TableCell>
                                        <TableCell> Preço Total </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        saleProducts.map((product) => {
                                            let productInfo = context.products[product["productId"]];
                                            if (productInfo && productInfo["price"]) {
                                                let finalPrice = productInfo["price"] * product["quantity"];
                                                salePrice += finalPrice;

                                                return (
                                                    <TableRow key={product[0]}>
                                                        <TableCell> {productInfo["productName"]} </TableCell>
                                                        <TableCell> {product["quantity"]} </TableCell>
                                                        <TableCell> {productInfo["price"].toFixed(2)}€ </TableCell>
                                                        <TableCell> {finalPrice.toFixed(2)}€ </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={9} />
                    <Grid item xs={3}>
                        <Typography variant="h2">Total: {salePrice.toFixed(2)}€ </Typography>
                    </Grid>

                </Grid>
            </DialogContent>
        </Dialog>
    )
}