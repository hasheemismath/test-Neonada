import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import tvMazeApi from '../../services/axios-config';
import { ENDPOINT } from '../../utils/constants';
import { SettingType } from '../../utils/types';

const initialState: SettingType = {
  isScheduleFetching: true,
  isShowFetching: false,
  schedules: [],
  show: null,
  error: { value: false, message: '' },
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateIsScheduleFetching: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isScheduleFetching = payload;
    },
    updateIsShowFetching: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isShowFetching = payload;
    },
    updateError: (
      state,
      {
        payload,
      }: PayloadAction<{ value: boolean; message: string }>
    ) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetch_schedules.fulfilled,
        (state, { payload }) => {
          state.schedules = payload;
          state.isScheduleFetching = false;
        }
      )
      .addCase(fetch_schedules.rejected, (state, action) => {
        state.isScheduleFetching = false;
        state.error = {
          value: true,
          message: action.payload as string,
        };
      })
      .addCase(fetch_show.fulfilled, (state, { payload }) => {
        state.show = payload;
        state.isShowFetching = false;
      })
      .addCase(fetch_show.rejected, (state, { payload }) => {
        state.isShowFetching = false;
        state.error = {
          value: true,
          message: payload as string,
        };
      });
  },
});

export const fetch_schedules = createAsyncThunk(
  'setting/fetch_schedules',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const {
      setting: { schedules },
    } = getState() as RootState;
    try {
      dispatch(updateIsScheduleFetching(true));
      const result = await tvMazeApi.get(ENDPOINT.SCHEDULE);
      return result?.data ?? schedules;
    } catch (error: any) {
      return rejectWithValue({
        data: schedules,
        message: error?.message ?? '',
      });
    }
  }
);

export const fetch_show = createAsyncThunk(
  'setting/fetch_shows',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updateIsShowFetching(true));
      const result = await tvMazeApi.get(
        `${ENDPOINT.SHOWS}/${id}?embed=cast`
      );
      return result?.data ?? {};
    } catch (error: any) {
      return rejectWithValue(error?.message ?? '');
    }
  }
);

export const {
  updateIsScheduleFetching,
  updateIsShowFetching,
  updateError,
} = settingSlice.actions;
export default settingSlice.reducer;
