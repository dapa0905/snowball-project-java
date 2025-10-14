"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  AccountCircle,
  Menu as MenuIcon,
  Home,
  Article,
  Assessment,
} from '@mui/icons-material';
import MajorIndex from "../Stocks/MajorIndex";
import MarketStatus from "../Stocks/MarketStatus";
import TabContainer from "@/constants/TabContainer";

const MainPage: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const twoDaysAgo = new Date(Date.now() - 86400000 * 2)
    .toISOString()
    .split("T")[0];
  const tickers: string[] = ["VOO", "QQQ", "UUP", "DIA"];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 상단 네비게이션 바 */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <TrendingUp sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            PayToWin
          </Typography>
          
          {/* 데스크톱 네비게이션 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" startIcon={<Home />}>Home</Button>
            <Button color="inherit" startIcon={<Article />}>News</Button>
            <Button color="inherit" startIcon={<Assessment />}>Stocks</Button>
          </Box>

          {/* 모바일 메뉴 */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Home sx={{ mr: 1 }} /> Home
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Article sx={{ mr: 1 }} /> News
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Assessment sx={{ mr: 1 }} /> Stocks
              </MenuItem>
            </Menu>
          </Box>

          <Button color="inherit" startIcon={<AccountCircle />}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* 메인 컨텐츠 */}
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        {/* 시장 상태 섹션 */}
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1 }} />
              Market Status
            </Typography>
            <MarketStatus />
          </CardContent>
        </Card>

        {/* 주요 지수 섹션 */}
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Assessment sx={{ mr: 1 }} />
              Major Indices
            </Typography>
            
            <Grid container spacing={2}>
              {tickers.map((ticker) => (
                <Grid item xs={12} sm={6} md={3} key={ticker}>
                  <MajorIndex
                    ticker={ticker}
                    startDate={twoDaysAgo}
                    endDate={yesterday}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Tab Container 섹션 */}
        <TabContainer />
      </Container>
    </Box>
  );
};

export default MainPage;