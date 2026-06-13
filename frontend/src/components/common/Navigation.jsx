/**
 * Navigation Component
 * Main navigation sidebar
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiFileText,
  FiBriefcase,
  FiUsers,
  FiBarChart2,
  FiSearch,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const Navigation = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: FiHome, href: '/dashboard' },
    { label: 'Campaigns', icon: FiBriefcase, href: '/campaigns' },
    { label: 'Content Generator', icon: FiFileText, href: '/content' },
    { label: 'Leads', icon: FiUsers, href: '/leads' },
    { label: 'SEO Toolkit', icon: FiSearch, href: '/seo' },
    { label: 'Analytics', icon: FiBarChart2, href: '/analytics' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:h-auto md:w-auto md:flex md:flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-primary-400">MarketAI</h1>
          <p className="text-sm text-gray-400">Digital Marketing Assistant</p>
        </div>

        {/* Menu Items */}
        <ul className="flex-1 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-6 py-3 transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-600 text-white border-r-4 border-primary-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Info */}
        <div className="p-6 border-t border-gray-800">
          <div className="mb-4">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold text-white">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
          >
            <FiLogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
