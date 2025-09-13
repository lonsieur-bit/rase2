# Admin Dashboard Setup Guide

## Step 1: Connect to Supabase
1. Click the "Connect to Supabase" button in the top-right corner of your development environment
2. This will set up your Supabase project and create the `.env` file with your credentials

## Step 2: Run Database Migration
After connecting to Supabase, the database tables will be created automatically from the migration file.

## Step 3: Create Admin User
1. **Register a user** through your main website (http://localhost:5173):
   - Go to the account page
   - Register with your email and password
   - Remember the email you used

2. **Make the user an admin** in Supabase:
   - Go to your Supabase dashboard
   - Navigate to "Table Editor" → "profiles"
   - Find your user record
   - Change the "role" field from "customer" to "admin"
   - Save the changes

## Step 4: Start Backend Server
```bash
npm run server
```

## Step 5: Access Admin Dashboard
1. Open: http://localhost:3001/admin/index.html
2. Login with the same email/password you registered with
3. You should now have access to the admin dashboard!

## Admin Dashboard Features:
- 📊 **Dashboard**: Sales statistics and overview
- 📦 **Orders**: Manage all customer orders
- 🛍️ **Products**: Add, edit, delete products
- 👥 **Users**: View and manage customers
- ⚙️ **Settings**: System configuration

## Troubleshooting:
- Make sure the backend server is running on port 3001
- Ensure your user role is set to "admin" in Supabase
- Check browser console for any error messages
- Verify Supabase connection is working