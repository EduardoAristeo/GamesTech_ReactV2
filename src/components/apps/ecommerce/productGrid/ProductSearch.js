// material
import { TextField, InputAdornment } from '@mui/material';
import { IconSearch } from '@tabler/icons';

// redux
import { useDispatch } from 'react-redux';
import { searchProduct } from 'src/store/apps/eCommerce/EcommerceSlice';

// ----------------------------------------------------------------------
export default function ProductSearch() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchProduct(e.target.value));
  };

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Search Field */}
      {/* ------------------------------------------- */}
      <TextField
        id="outlined-search"
        placeholder="Search Product"
        size="small"
        type="search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size="14" />
            </InputAdornment>
          ),
        }}
        fullWidth
        onChange={handleSearch}
      />
    </>
  );
}
