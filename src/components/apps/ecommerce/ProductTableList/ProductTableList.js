import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  MenuItem
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories, fetchDeleteProduct } from 'src/store/apps/eCommerce/EcommerceSlice';
import CustomCheckbox from '../../../forms/theme-elements/CustomCheckbox';
import CustomSwitch from '../../../forms/theme-elements/CustomSwitch';
import { IconEdit, IconEye, IconFilter, IconSearch, IconTrash } from '@tabler/icons';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Producto',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descripción',
  },

  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Precio',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Accción',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputprops={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => { 
  const { numSelected, handleSearch, search, handleFilterClick, handleDeleteSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          Seleccionados {numSelected}
        </Typography>
      ) : (
        <Box sx={{ flex: '1 1 100%' }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Buscar Producto"
            size="small"
            onChange={handleSearch}
            value={search}
          />
        </Box>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteSelected}>
            <IconTrash width="18" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={handleFilterClick}>
            <IconFilter size="1.2rem" icon="filter" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
};

const ProductTableList = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // Estados y funciones para el diálogo de confirmación
  const [open, setOpen] = React.useState(false);
  const [productIdToDelete, setProductIdToDelete] = React.useState(null);
  // Estados y funciones para el dialogo de Delete de varios productos
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [productsToDelete, setProductsToDelete] = React.useState([]);

  const dispatch = useDispatch();
  // Estados para los filtros 
  const [filters, setFilters] = React.useState({
    category: 'All',
    priceRange: null, // { min: 0, max: 1000 } 
    status: 'All',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters({
      ...filters,
      priceRange: { min, max },
    });
  };

  const handleClickOpen = (productId) => {
    setProductIdToDelete(productId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(fetchDeleteProduct(productIdToDelete));
    setOpen(false);
  };

  // Estados y funciones para el diálogo de filtros 
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
  const handleFilterDialogOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };

  const handleDeleteSelected = () => {
    const selectedProducts = rows.filter((row) => selected.includes(row.title));
    setProductsToDelete(selectedProducts);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = () => {
    productsToDelete.forEach((product) => {
      dispatch(fetchDeleteProduct(product._id));
    });
    setDeleteDialogOpen(false);
    setSelected([]);
  };

  //Fetch Products
  React.useEffect(() => {
    dispatch((fetchProducts()));
    dispatch((fetchCategories()));
  }, [dispatch]);


  const { products, categories } = useSelector((state) => state.ecommerce);
  //console.log("Productos obtenidos de Redux:", products);
  const formattedProducts = React.useMemo(() => {
    //console.log("Productos para formatear:", products);
    return products.map((product) => ({
      _id: product._id,
      title: product.product,
      price: product.price,
      stock: product.stock,
      cost: product.cost,
      description: product.description,
      category: categories.find((cat) => cat._id === product.category)?.category || 'Categoría desconocida',
      status: product.status,
      discount: product.discount,
      __v: product.__v,
      photo: `http://localhost:4000/images/products/${product._id}.png` || '',
    }));
  }, [products, categories]);
  //console.log("Productos formateados:", formattedProducts);


  const [rows, setRows] = React.useState(formattedProducts);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setRows(formattedProducts);
  }, [formattedProducts]);

  const handleSearch = (event) => {
    const filteredRows = formattedProducts.filter((row) => {
      return row.title.toLowerCase().includes(event.target.value);
    });
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  // This is for the sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // This is for the single row sleect
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const filteredRows = rows.filter((row) => {
    let isMatch = true;
    if (filters.category !== 'All' && row.category !== filters.category) {
      isMatch = false;
    }
    if (filters.priceRange && (row.price < filters.priceRange.min || row.price > filters.priceRange.max)) {
      isMatch = false;
    }
    if (filters.status !== 'All') {
      const stockStatus = row.stock ? 'InStock' : 'OutOfStock';
      if (filters.status !== stockStatus) {
        isMatch = false;
      }
    }
    return isMatch;
  });

  return (
    <Box>
      <Box>
        <EnhancedTableToolbar
          numSelected={selected.length}
          search={search}
          handleSearch={(event) => handleSearch(event)}
          handleFilterClick={handleFilterDialogOpen}
          handleDeleteSelected={handleDeleteSelected}
        />
        <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(filteredRows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.title);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.title)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.title}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <CustomCheckbox
                            color="primary"
                            checked={isItemSelected}
                            inputprops={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              src={row.photo}
                              alt={row.photo}
                              variant="rounded"
                              sx={{ width: 56, height: 56, borderRadius: '100%' }}
                            />
                            <Box
                              sx={{
                                ml: 2,
                              }}
                            >
                              <Typography variant="h6" fontWeight="600">
                                {row.title}
                              </Typography>
                              <Typography color="textSecondary" variant="subtitle2">
                                {row.category}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 350, wordWrap: 'break-word', whiteSpace: 'normal' }}>
                          <Typography noWrap>
                            {row.description}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Box
                              sx={{
                                backgroundColor: row.stock
                                  ? (theme) => theme.palette.success.main
                                  : (theme) => theme.palette.error.main,
                                borderRadius: '100%',
                                height: '10px',
                                width: '10px',
                              }}
                            />
                            <Typography
                              color="textSecondary"
                              variant="subtitle2"
                              sx={{
                                ml: 1,
                              }}
                            >
                              {row.stock ? 'InStock' : 'Out of Stock'}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography fontWeight="500" variant="h6">
                            ${row.price}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Editar producto">
                            <IconButton
                              color="success"
                              component={Link}
                              to={`/apps/ecommerce/edit-product/`}
                            >
                              <IconEdit width={22} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Ver detalles del producto">
                            <IconButton
                              color="primary"
                              component={Link}
                              to={`/apps/ecommerce/detail/${row._id}`}
                            >
                              <IconEye width={22} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar producto">
                            <IconButton
                              color="error"
                              onClick={() => handleClickOpen(row._id)}
                            >
                              <IconTrash width={22} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box ml={2}>
          <FormControlLabel
            control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      </Box>
      {/* Diálogo de confirmación para eliminar un producto */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Diálogo de filtros */}
      <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose} aria-labelledby="filter-dialog-title">
        <DialogTitle id="filter-dialog-title">
          Filtro de Productos
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Usa esta opcion para filtrar tus productos
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <TextField select
              label="Categoria"
              name="category"
              value={filters.category}
              onChange={handleFilterChange} fullWidth
            >
              <MenuItem value="All">Todo</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.category}>{category.category}</MenuItem>
              ))}
            </TextField>
            <TextField label="Precio minimo"
              type="number"
              value={filters.priceRange?.min || ''}
              onChange={(e) => handlePriceRangeChange(e.target.value, filters.priceRange?.max || '')}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Precio Maximo"
              type="number"
              value={filters.priceRange?.max || ''}
              onChange={(e) => handlePriceRangeChange(filters.priceRange?.min || '', e.target.value)}
              fullWidth sx={{ mt: 2 }}
            />
            <TextField
              select
              label="Status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              fullWidth sx={{ mt: 2 }}
            >
              <MenuItem value="All">Todo</MenuItem>
              <MenuItem value="InStock">En Stock</MenuItem>
              <MenuItem value="OutOfStock">Sin Stock</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterDialogClose} color="primary">Cancelar</Button>
          <Button onClick={handleFilterDialogClose} color="primary">Aplicar</Button>
        </DialogActions>
      </Dialog>
      {/* Diálogo de confirmación para eliminar productos seleccionados */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {"Confirmar Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            ¿Estás seguro de que deseas eliminar los siguientes productos? Esta acción no se puede deshacer.
          </DialogContentText>
          <ul>
            {productsToDelete.map((product) => (
              <li key={product._id}>{product.title}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductTableList;
